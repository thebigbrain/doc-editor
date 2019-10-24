exports.beforeFind = function (option) {
  return async (context) => {
    const {service, params} = context

    try {
      let r = await service.Model.findOne({
        id: {
          $regex: params.query.id.toString()
        }
      })
      if (r != null) {
        context.result = {total: 1, data: [r]}
      }
    } catch (e) {
      console.error(e)
    }

    return context
  }
}
