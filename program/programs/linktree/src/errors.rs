use crate::*;

#[error_code]
pub enum Errors {
    #[msg("Selected option must be either 1,2,3,4")]
    OptionMustBeInFourIndex,
    #[msg("Poll already ended")]
    PollEndedError,
    #[msg("You Already Answered")]
    AlreadyAnsweredError,
}
