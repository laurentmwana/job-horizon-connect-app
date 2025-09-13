<?php

namespace Tests\Feature\Offer;

use App\Models\Offer;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OfferControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_collection_offer(): void
    {
        $response = $this->get(route('offer.index'));

        $response->assertStatus(200);
    }

    public function test_item_offer(): void
    {
        $offer = Offer::first();

        $response = $this->get(route('offer.show', ['id' => $offer->id]));

        $response->assertStatus(200);
    }
}
