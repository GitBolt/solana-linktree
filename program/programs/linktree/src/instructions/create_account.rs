use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(account_id : u32)]
pub struct InitializeAccount<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + 4 + 32 + (4 + 0) + (4 + 40 * 5) + 2, // 40 chars long 5 links 
        seeds = [b"linktree_account", account_id.to_le_bytes().as_ref()], 
        bump
    )]
    pub linktree_account: Account<'info, LinktreeAccount>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<InitializeAccount>,
    account_id: u32,
    profile_link: String,
) -> Result<()> {
    let linktree_account = &mut ctx.accounts.linktree_account;

    linktree_account.id = account_id;
    linktree_account.owner = *ctx.accounts.authority.key;
    linktree_account.profile_link = profile_link;
    linktree_account.link_count = 0;

    msg!("Created a new link tree account! Id: {}", account_id);
    Ok(())
}
