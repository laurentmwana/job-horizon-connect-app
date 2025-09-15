<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class StringHelper
{

    /**
     * @param mixed $content
     * @return string|null
     */
    public static function markdown(?string $content): ?string
    {
        if (empty($content)) {
            return null;
        }

        $isHtml = $content !== strip_tags($content);

        if ($isHtml) {
            return $content; 
        }

        return Str::markdown($content, [
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);
    }

}