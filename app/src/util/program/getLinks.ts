import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const getLinks = async (
  wallet: anchor.Wallet,
  linktreeId: number,
) => {
  const program = anchorProgram(wallet);

  try {
    // @ts-ignore
    let data = await program.account.individualLink.all([
      {
        memcmp: {
          offset: 8,
          bytes: anchor.utils.bytes.bs58.encode(Uint8Array.from([linktreeId])),
        },
      },
    ]);

    return { sig: data, error: false }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}
