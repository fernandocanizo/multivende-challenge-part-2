import * as productModel from '../model/product.mjs'

export const getStatus = async (_, res) => {
  const status = await productModel.getStatus()
  if (status) {
    // clean a little bit
    const cleanStatus = status.map(v => ({status: v.fk_status, count: v.count}))
    return res.json(cleanStatus)
  } else {
    return res.status(500).json({
      message: 'Error retrieving product status',
    })
  }
}
