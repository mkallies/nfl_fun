const MAPPER = {
  Player: 'player',
  Team: 'team',
  Pos: 'position',
  Att: 'attempts',
  'Att/G': 'attempts_per_game',
  Yds: 'total_yards',
  Avg: 'avg_rush_per_attempt',
  'Yds/G': 'rushing_yards_per_game',
  TD: 'rushing_tds',
  Lng: 'longest_rush',
  '1st': 'rushing_first_down',
  '1st%': 'rushing_first_down_pct',
  '20+': 'rushing_20',
  '40+': 'rushing_40',
  FUM: 'fumbles',
}

const STRING_KEYS = ['position', 'player', 'team', 'longest_rush']

module.exports = (sequelize, DataTypes) => {
  const Rushing = sequelize.define('rushing', {
    player: DataTypes.STRING,
    team: DataTypes.STRING,
    // Pos
    position: DataTypes.STRING,
    // Att
    attempts: DataTypes.INTEGER,
    // Att/G
    attempts_per_game: DataTypes.DECIMAL,
    // Yds
    total_yards: DataTypes.INTEGER,
    // Avg
    avg_rush_per_attempt: DataTypes.DECIMAL,
    // Yds/G
    rushing_yards_per_game: DataTypes.DECIMAL,
    // TD
    rushing_tds: DataTypes.INTEGER,
    // Lng
    longest_rush: DataTypes.STRING,
    // 1st
    rushing_first_down: DataTypes.INTEGER,
    // 1st%
    rushing_first_down_pct: DataTypes.DECIMAL,
    // 20+
    rushing_20: DataTypes.INTEGER,
    // 40+
    rushing_40: DataTypes.INTEGER,
    // FUM
    fumbles: DataTypes.INTEGER,
  })

  Rushing.mapToSchema = (objToSave) => {
    return Object.keys(objToSave).reduce((acc, next) => {
      const key = MAPPER[next]

      if (STRING_KEYS.includes(key)) {
        acc[key] = objToSave[next]
      } else {
        const value = objToSave[next]
        acc[key] =
          typeof value === 'number' ? value : Number(value.replace(',', ''))
      }

      return acc
    }, {})
  }

  return Rushing
}
