import crypto from 'crypto';

// encriptar a senha
export function hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
}

// verificar a senha
export function verifyPassword({candidatePassword, salt, hash}: {candidatePassword: string, salt: string, hash: string}) {
    const verifyHash = crypto.pbkdf2Sync(candidatePassword, salt, 1000, 64, 'sha512').toString('hex');
    return verifyHash === hash;
    
}