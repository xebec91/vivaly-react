<?php

namespace App\Controller\Api;

class ProductApiController
{
    private function json($data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    private function getProducts(): array
    {
        $products = require __DIR__ . '/../../Config/products.php';
        return is_array($products) ? $products : [];
    }

    public function index(): void
    {
        $products = array_values($this->getProducts());
        $this->json($products);
    }

    public function show(int $id): void
    {
        $products = $this->getProducts();

        if (!isset($products[$id])) {
            $this->json(['error' => 'Produit introuvable'], 404);
            return;
        }

        $this->json($products[$id]);
    }
}