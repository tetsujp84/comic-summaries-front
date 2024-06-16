import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">このサイトについて</h1>
      <p className="mb-2">
        このサイトでは、人工知能（AI）を使用して漫画のあらすじや情報を生成しています。AIの生成する情報は必ずしも正確ではない場合がありますので、参考程度にご利用ください。
      </p>
      <p className="mb-2">
        このサイトの情報は常に最新であるとは限りません。正確な情報は公式のソースや専門家の情報を確認してください。
      </p>
    </div>
  );
};

export default About;
