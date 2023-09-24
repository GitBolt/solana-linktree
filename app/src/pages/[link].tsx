export default function Home({ price, user, setUser }: { price: string, user?: string, setUser?: any}) {
  return (
    <>
    

    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const data = await fetch('https://pricing.wagmi.bio/solana');
    const json = await data.json();
    const { price } = json;
    return { props: { price: price || 0 } };
  } catch (err) {
    console.log(err);
    return {}
  }
};