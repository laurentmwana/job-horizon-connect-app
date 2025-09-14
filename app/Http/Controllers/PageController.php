<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class PageController extends Controller
{
    /**
     * @return \Inertia\Response
     */
    public function about()
    {
        return Inertia::render('base/about');
    }
}
