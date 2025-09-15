<?php

namespace App\Enums;

enum UserRoleEnum: string
{
    case ADMIN = "admin";

    case ANONYMOUS = "anonymous";

    public static function values(): array
    {
        return array_map(
            fn(self $enum) => $enum->value,
            self::cases()
        );
    }
}
