use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(account_id : u32)]
pub struct UpdateAccount<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"linktree_account", account_id.to_le_bytes().as_ref()], 
        bump
    )]
    pub linktree_account: Account<'info, LinktreeAccount>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<UpdateAccount>,
    account_id: u32,
    profile_link: String,
    bg_color: String,
) -> Result<()> {
    let linktree_account = &mut ctx.accounts.linktree_account;

    linktree_account.id = account_id;
    linktree_account.owner = *ctx.accounts.authority.key;

    if !profile_link.is_empty() {
        linktree_account.profile_link = profile_link;
    }
    if !bg_color.is_empty() {
        linktree_account.bg_color = bg_color;
    }
    linktree_account.link_count = 0;

    msg!("Created a new link tree account! Id: {}", account_id);
    Ok(())
}
