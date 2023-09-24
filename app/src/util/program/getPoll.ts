import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const getPoll = async (
  wallet: anchor.Wallet,
  id: number,
) => {
  const program = anchorProgram(wallet);

  try {
    let data = await program.account.pollAccount.all([
      {
        memcmp: {
          offset: 8,
          bytes: anchor.utils.bytes.bs58.encode(Uint8Array.from([id])),
        },
      },
    ]);
    return { sig: data[0], error: false }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}
