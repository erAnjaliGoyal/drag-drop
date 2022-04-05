import Document, { Html, Head, Main, NextScript } from "next/document";
import { extractCritical } from "@emotion/server";
import { resetServerContext } from "react-beautiful-dnd";

export default class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const page = await ctx.renderPage();
  //   const initialProps = await Document.getInitialProps(ctx);
  //   const styles = extractCritical(page.html);
  //   console.log(page,initialProps,styles);
  //   resetServerContext();
  //   return { ...initialProps, ...page, ...styles };
  // }

  static async getInitialProps(ctx) {
    // const originalRenderPage = ctx.renderPage;

    // ctx.renderPage = () =>
    //   originalRenderPage({
    //     enhanceApp: App => props => {
    //       resetServerContext();
    //       return <App {...props} />;
    //     }
    //   });

    // const initialProps = await Document.getInitialProps(ctx);

    // return { ...initialProps };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
         
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}