<?php

namespace App\Controller\Api;

use Stripe\Stripe;
use Stripe\Checkout\Session;

class CheckoutApiController
{
    private function json(array $data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    private function getJsonInput(): array
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        return is_array($data) ? $data : [];
    }

    private function getConfig(): array
    {
        $config = parse_ini_file(__DIR__ . '/../../../.env');
        return is_array($config) ? $config : [];
    }

    private function getProducts(): array
    {
        $products = require __DIR__ . '/../../Config/products.php';
        return is_array($products) ? $products : [];
    }

    public function session(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->json(['error' => 'Méthode non autorisée.'], 405);
            return;
        }

        $data = $this->getJsonInput();
        $items = $data['items'] ?? [];

        if (!is_array($items) || empty($items)) {
            $this->json(['error' => 'Panier vide.'], 422);
            return;
        }

        $config = $this->getConfig();

        if (empty($config['STRIPE_SECRET_KEY']) || empty($config['APP_URL'])) {
            $this->json(['error' => 'Configuration Stripe incomplète.'], 500);
            return;
        }

        Stripe::setApiKey($config['STRIPE_SECRET_KEY']);

        $products = $this->getProducts();
        $lineItems = [];

        foreach ($items as $item) {
            $productId = isset($item['id']) ? (int) $item['id'] : 0;
            $quantity = isset($item['quantity']) ? (int) $item['quantity'] : 1;

            if ($productId <= 0 || $quantity <= 0) {
                continue;
            }

            if (!isset($products[$productId])) {
                $this->json(['error' => "Produit introuvable : $productId"], 404);
                return;
            }

            $product = $products[$productId];

            if (($product['stock'] ?? 0) < $quantity) {
                $this->json([
                    'error' => 'Stock insuffisant pour le produit : ' . $product['name'],
                ], 422);
                return;
            }

            $unitAmount = (int) round(((float) $product['price']) * 100);

            $lineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $product['name'],
                        'description' => $product['description'],
                    ],
                    'unit_amount' => $unitAmount,
                ],
                'quantity' => $quantity,
            ];
        }

        if (empty($lineItems)) {
            $this->json(['error' => 'Aucun article valide dans le panier.'], 422);
            return;
        }

        try {
            $session = Session::create([
                'mode' => 'payment',
                'line_items' => $lineItems,
                'success_url' => rtrim($config['APP_URL'], '/') . '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => rtrim($config['APP_URL'], '/') . '/checkout/cancel',
            ]);

            $this->json([
                'url' => $session->url,
            ]);
        } catch (\Throwable $e) {
            $this->json([
                'error' => 'Erreur Stripe : ' . $e->getMessage(),
            ], 500);
        }
    }
}