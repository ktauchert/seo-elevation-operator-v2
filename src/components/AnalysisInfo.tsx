import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  analysis: string;
};

const AnalysisInfo = (props: Props) => {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Customize specific elements if needed
          h1: ({ ...props }) => (
            <h1 className="text-2xl font-bold mb-2" {...props} />
          ),
          h2: ({  ...props }) => (
            <h2 className="text-xl font-semibold mb-2" {...props} />
          ),
          h3: ({  ...props }) => (
            <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />
          ),
          p: ({  ...props }) => (
            <p className="text-base leading-relaxed my-2" {...props} />
          ),
          ul: ({  ...props }) => (
            <ul className="list-disc pl-4 ml-5" {...props} />
          ),
          ol: ({  ...props }) => (
            <ol className="list-decimal ml-5" {...props} />
          ),
          a: ({  ...props }) => (
            <a
              className="text-blue-500 underline hover:text-blue-700"
              {...props}
            />
          ),
        }}
      >
        {props.analysis}
      </ReactMarkdown>
    </div>
  );
};

export default AnalysisInfo;
