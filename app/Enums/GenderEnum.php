<?php

namespace App\Enums;
enum GenderEnum: string
{
    case MALE = "homme";
    case FEMALE = "femme";

    public static function values(): array
    {
        return array_map(
            fn(GenderEnum $enum) => $enum->value,
            GenderEnum::cases()
        );
    }
}
