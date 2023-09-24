import * as anchor from '@coral-xyz/anchor'
import { anchorProgram } from '@/util/helper';

export const stopPoll = async (
  wallet: anchor.Wallet,
  pollId: number,
) => {
  const program = anchorProgram(wallet);

  const [pollAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("poll"), new anchor.BN(pollId).toArrayLike(Buffer, "le", 4)],
    program.programId
  );


  try {

    const sig = await program.methods
      .closePoll(
        new anchor.BN(pollId),
      )
      .accounts({
        pollAccount,
        authority: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }).rpc()

    return { error: false, sig }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}