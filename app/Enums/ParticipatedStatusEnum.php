<?php

namespace App\Enums;

enum ParticipatedStatusEnum: string
{
    case PENDING = "pending";
    case ACCEPTED = "accepted";
    case REFUSED = "refused";

    public static function values(): array
    {
        return array_map(
            fn(self $enum) => $enum->value,
            self::cases()
        );
    }
}
