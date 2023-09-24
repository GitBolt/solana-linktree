import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const getPolls = async (
  wallet: anchor.Wallet,
  userOnly?: boolean,
  showEnded?: boolean,
) => {
  const program = anchorProgram(wallet);

  try {
    let data = await program.account.pollAccount.all(showEnded ? undefined : [
      {
        memcmp: {
          offset: 8 + 4,
          bytes: anchor.utils.bytes.bs58.encode(Uint8Array.from([1])),
        },
      },
    ]);

    if (userOnly) {
      data = data.filter((d) => d.account.owner.toBase58() == wallet.publicKey.toBase58())
    }

    return { sig: data, error: false }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}
