import fs from 'fs';
import matter from 'gray-matter';


const Product = (props) => {
    console.log(props);
    return <p>Product</p>
};

export const getStaticPaths = () => {
    // product pages to generate
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);

    const paths = filenames.map((filename) => {
        return {
            params: {
                product: filename.replace(".md",""),
            },
        };
    });

    return {
        paths,
        fallback: false, // fallback false tells the program to use the default 404 page
    };
};

export const getStaticProps = async (context) => {
    const productName = context.params.product;
    const filePath = `${process.cwd()}/content/${productName}.md`;
    const fileContent = fs.readFileSync(filePath).toString();
    const { data, content } = matter(fileContent);
console.log('productName: ' + productName + '\nfilePath: ' + filePath + '\nfileContent: ' + fileContent + '\ndata: ' + data + '\ncontent: ' + content);
    
    return {
        props: {
            product: {
                data,
                content,
            },
        },
    };
};

export default Product; 