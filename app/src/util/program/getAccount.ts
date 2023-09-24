import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const getAccount = async (
  wallet: anchor.Wallet,
) => {
  const program = anchorProgram(wallet);

  try {
    // @ts-ignore
    let data = await program.account.linktreeAccount.all([
      {
        memcmp: {
          offset: 8 + 4 + 8,
          bytes: wallet.publicKey.toBase58(),
        },
      },
    ]);
    console.log(data)
    return { sig: data[0], error: false }

  } catch (e: any) {
    console.log("Get Account Error: ", e)
    return { error: e.toString(), sig: null }
  }
}
