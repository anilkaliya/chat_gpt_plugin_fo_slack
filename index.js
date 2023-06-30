const axios = require('axios');

 const handler = async(event) => {
    console.log(event)

    
    const OPEN_AI_KEY='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'
    
    const SLACK_TOKEN="xoxp-5518079832001-5502516903573-5509288687412-9e3d895da58d37d59c1ce572b5da3600"
    const CHANNEL_ID="C05FKAY5AE4"
    const slackPrefix="https://slack.com/api"
    const COMPLETION_API_PREFIX='https://api.openai.com/v1/engines/text-davinci-002/completions'
    const slackApi=`${slackPrefix}/chat.postMessage`
    const completion_body={
        prompt: "what is rainbow",
        max_tokens: 50,
        temperature: 0.7,
        n: 1
      }
      
    const completionResponse=await axios.post(COMPLETION_API_PREFIX,completion_body,{headers: {
        Authorization: `Bearer ${OPEN_AI_KEY}`
      }
    })
    const aiResponse=completionResponse.data.choices[0].text
    const res=await axios.post(slackApi, {
        channel: CHANNEL_ID,
        text: aiResponse
      }, {
        headers: {
          Authorization: `Bearer ${SLACK_TOKEN}`
        }
      })
      console.log(res)
};
handler({})