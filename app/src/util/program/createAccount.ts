import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const createAccount = async (
  wallet: anchor.Wallet,
  accountId: number,
  profileLink: string,
) => {
  const program = anchorProgram(wallet);

  const [linktreeAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("linktree_account"),
      new anchor.BN(accountId).toArrayLike(Buffer, "le", 4),
    ],
    program.programId
  );


  try {

    const sig = await program.methods
      .createAccount(accountId, profileLink)
      .accounts({
        linktreeAccount,
        authority: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    return { error: false, sig }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}