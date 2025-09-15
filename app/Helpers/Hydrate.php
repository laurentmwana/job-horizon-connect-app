<?php

namespace App\Helpers;

abstract class Hydrate
{
    /**
     *
     * @param array $data
     * @param object $object
     * @return object
     */
    public static function hydrate(array $data, object $object): object
    {
        foreach ($data as $key => $value) {
            // conversion snake_case -> camelCase
            $property = self::snakeToCamel($key);

            if (property_exists($object, $property)) {
                $object->$property = $value;
            }
        }

        return $object;
    }

    private static function snakeToCamel(string $string): string
    {
        return lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $string))));
    }
}
