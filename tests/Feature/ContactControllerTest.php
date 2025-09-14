<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_show_form(): void
    {
        $response = $this->get('/contact');

        $response->assertStatus(200);
    }


    public function test_send_message_fail_validator(): void
    {
        $data = [];
        $response = $this->post('/contact/send-message', $data);

        $response->assertStatus(302);
        $response->assertSessionHasErrors();
    }


    public function test_send_message_success(): void
    {
        $data = [
            'name' => 'labeya',
            'email' => 'labeya@gmail.com',
            'subject' => 'hey, salut  tu vas bien ?',
            'message' => "Je suis ce que je suis grâce à ce que nous sommes tous."
        ];
        $response = $this->post('/contact/send-message', $data);

        $response->assertStatus(302);
        $response->assertSessionHasNoErrors();
    }
}
