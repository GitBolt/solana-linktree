import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const createPollUser = async (
  wallet: anchor.Wallet,
  pollId: number,
) => {

  const program = anchorProgram(wallet);

  const [pollUserAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("poll_user"),
      wallet.publicKey.toBuffer(),
      new anchor.BN(pollId).toArrayLike(Buffer, "le", 4),
    ],
    program.programId
  );

  try {

    const sig = await program.methods
      .createPollUser(
        new anchor.BN(pollId),
      )
      .accounts({
        pollUserAccount,
        authority: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }).instruction()

    return { error: false, sig }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}