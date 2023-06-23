const express = require('express');
const { check, validationResult } = require('express-validator');
const PurchasedTokenService = require('../../services/PurchasedTokenService');

const router = express.Router();

router.post(
  '/validate-token',
  [
    check('token', 'token is Required').exists().notEmpty().isNumeric().isLength({ min: 8, max: 8 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token } = req.body;
    
    try {
      let days;
      const purchasedToken = await PurchasedTokenService.getByToken(token);

      if (purchasedToken) days = purchasedToken.token_value_days;
      else return res.status(400).json({ error: 'This token was not generated from this system' });

      return res.status(200).json({ days });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
