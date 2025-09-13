<?php

namespace Tests\Feature\Activity;

use App\Models\Activity;
use Tests\TestCase;

class ActivityControllerTest extends TestCase
{
    public function test_collection_activity(): void
    {
        $response = $this->get(route('activity.index'));

        $response->assertStatus(200);
    }

    public function test_item_activity(): void
    {
        $activity = Activity::first();

        $response = $this->get(route('activity.show', ['id' => $activity->id]));

        $response->assertStatus(200);
    }
}
