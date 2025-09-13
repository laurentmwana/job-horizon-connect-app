import { Offer } from '@/types/model';

export const isOfferExpired = (offer: Offer): boolean => {
    return new Date(offer.end_at) < new Date();
};
