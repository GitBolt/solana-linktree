use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

pub use errors::*;
pub use instructions::*;
pub use state::*;

declare_id!("EDNrxi9eR9Lr7TYUVdb7ugza8FXyG65sXwzrM6Es2sih");

#[program]
pub mod linktree {
    use super::*;

    pub fn create_account(
        ctx: Context<InitializeAccount>,
        account_id: u32,
        profile_link: String,
    ) -> Result<()> {
        instructions::create_account::handler(ctx, account_id, profile_link)
    }

    pub fn add_link(
        ctx: Context<InitializeLinkAccount>,
        linktree_id: u32,
        link_name: String,
        link_url: String,
    ) -> Result<()> {
        instructions::add_link::handler(ctx, linktree_id, link_name, link_url)
    }

    pub fn remove_link(
        ctx: Context<RemoveLink>,
        linktree_id: u32,
        link_name: String,
    ) -> Result<()> {
        instructions::remove_link::handler(ctx, linktree_id, link_name)
    }

    pub fn update_account(
        ctx: Context<UpdateAccount>,
        account_id: u32,
        profile_link: String,
        bg_color: String,
    ) -> Result<()> {
        instructions::update_account::handler(ctx, account_id, profile_link, bg_color)
    }
}
