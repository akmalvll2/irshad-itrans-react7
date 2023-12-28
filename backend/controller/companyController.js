const companyModel = require('../model/companyModel')

//function to convert blob data from database to an image URL
const createImageUrl = (bufferData) => {
    // Convert the Buffer data to a Base64 string
    const base64String = Buffer.from(bufferData).toString('base64')
    // Create a data URL
    const imageUrl = `data:image/png;base64,${base64String}`
    return imageUrl
}

//function to request all data from company table
async function getAllCompany (req,res) {
    try {
        const company = await companyModel.getAllCompany()
        company[0].company_logo = createImageUrl(company[0].company_logo)
        res.json(company)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllCompany}