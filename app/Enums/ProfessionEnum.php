<?php

namespace App\Enums;

enum ProfessionEnum: string
{
    case STUDENT = "student";

    case EMPLOYEE = "employee";

    case RETIRED = "retired";

    public static function values(): array
    {
        return array_map(
            fn(self $enum) => $enum->value,
            self::cases()
        );
    }
}
