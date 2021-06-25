import constants from '../config/constants';
import * as express from 'express';

export function fileKeySanitizer(name: string): string {
    return Date.now()+"_"+name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
}