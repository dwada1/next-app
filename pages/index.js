import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';

const HomePage = (props) => {
    return props.products.map((product) => {
        return (
            <div key={product.name}>
                <Link href={product.slug}>
                    <a>
                        <h1>{product.name}</h1>
                    </a>
                </Link>
                <p>{product.description}</p>
                <p>${product.price / 100}</p>
            </div>
        );
    });
};
 
export const getStaticProps = async () => {
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);

    const products = filenames.map((filename) => {
        // read the file from fs
        const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
//        console.log(fileContent);
        // pull out frontmatter => name
        const { data } = matter(fileContent);
//        console.log(data);
        // return name, slug
        const slug = `/products/${filename.replace('.md', '')}`;
        const product = {
            ...data, // ... is a spread operator
            slug, // same as slug: slug
        };
//        console.log(product);
        return product;
    });
//    console.log(filenames);     // console.log in getStaticProps will log in the cmd terminal instead of browser
    return {
        props: {
            products,
        },
    };
};

export default HomePage;