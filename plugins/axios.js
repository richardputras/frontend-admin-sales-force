export default function({ $axios }, inject) {
  $axios.setHeader('Content-Type', 'application/json');

  // const api = $axios.create({
  //   headers: {
  //     common: {
  //       Accept: 'text/plain, */*'
  //     }
  //   }
  // })

  // api.setBaseURL('http://localhost:9000/outclass/api')

  // inject('api', api)
}
