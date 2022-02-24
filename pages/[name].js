import { useRouter } from 'next/router';

const Name = () => {
    const router = useRouter();
    const query = router.query;
    const { name } = query; // Pluck out name directly from query Object
//    console.log(query);
    return <h1>Welcome {name}</h1>
};

export default Name;