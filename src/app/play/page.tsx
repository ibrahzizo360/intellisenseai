import React from 'react';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';

const MyComponent = () => {
  const text = `
    Mean Squared Error (MSE) is a common metric used to evaluate the performance of a regression model. It quantifies the average squared difference between the actual values and the predicted values produced by the model. The formula for calculating the Mean Squared Error is given by:

    \`\`\`latex
    MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2
    \`\`\`


    \`\`\`math
    MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2
    \`\`\`

    where:
    - (n) is the number of data points,
    - (y_i) is the actual value of the target variable for the (i)th data point,
    - (\\hat{y}_i) is the predicted value of the target variable for the (i)th data point.

    A lower MSE value indicates that the model's predictions are closer to the actual values, representing a better fit of the model to the data.
  `;

  return (
    <div>
      <Markdown
        // remarkPlugins={[remarkGfm]}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}

        // components={{
        //   br: ({ node, ...props }) => <br />,
          
        // }}
        // skipHtml={false} // Enable rendering of HTML tags
      >
        {text}
      </Markdown>
    </div>
  );
};

export default MyComponent;
