const { Argument } = require('discord-akairo')
const LilirucaCommand = require('@structures/LilirucaCommand')
const { removeItem } = require('@utils/items')
const { backgrounds, EMOJIS: { paintbrush } } = require('@constants')

class Setbackground extends LilirucaCommand {
  constructor () {
    super('setbackground', {
      aliases: ['sb'],
      emoji: paintbrush,
      editable: true,
      args: [
        {
          id: 'id',
          type: Argument.range('integer', 1, backgrounds.length),
          default: 1
        }
      ]
    })
  }

  async exec ({ ct, db, member, util }, { id }) {
    const data = await db.users.get(member.id)

    if (!data.items.frame) {
      return util.send(ct('noFrame'))
    }

    removeItem(data, 'items', 'frame')

    const values = {
      background: id
    }

    db.users.update(data, values)

    util.send(`\\🖌️ ${ct('success')}`)
  }
}

module.exports = Setbackground