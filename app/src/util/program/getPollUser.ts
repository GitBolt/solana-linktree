import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';
import { PublicKey } from '@solana/web3.js';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';

export const getUser = async (
    wallet: anchor.Wallet,
    pollId: number,
    address: PublicKey,
) => {
    const program = anchorProgram(wallet);
    try {
        const data = await program.account.pollUserAccount.all([
            {
                memcmp: {
                    offset: 8,
                    bytes: bs58.encode(Uint8Array.from([pollId])),
                },
            },
        ]);
        console.log(data)
        return { sig: data.filter((u) => u.account.owner.toBase58() == address.toBase58())[0], error: false }

    } catch (e: any) {
        console.log(e)
        return { error: e.toString(), sig: null }
    }
}
