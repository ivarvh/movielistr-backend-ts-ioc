import * as now from 'nano-time';

export const generateUniqueId = (): string => {
    return now(); //just returning the current microseconds, should be unique enough.
};