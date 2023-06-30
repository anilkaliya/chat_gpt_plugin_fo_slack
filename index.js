const axios = require('axios');
 exports.handler = async(event) => {
    const item=event.event.item
    const question=item.message.text
    const OPEN_AI_KEY=process.env.OPEN_AI_KEY
    const SLACK_TOKEN=process.env.SLACK_TOKEN
    const CHANNEL_ID=process.env.CHANNEL_ID
    const slackPrefix="https://slack.com/api"
    const COMPLETION_API_PREFIX='https://api.openai.com/v1/engines/text-davinci-002/completions'
    const slackApi=`${slackPrefix}/chat.postMessage`
    const completion_body={
        prompt: question,
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
};
