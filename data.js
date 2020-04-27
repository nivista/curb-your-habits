import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db')

db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
    console.log('Foreign keys turned on')
);

export function initializeTables() {
    db.transaction(tx => {
        tx.executeSql(`
      CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        color TEXT NOT NULL,
        filterStatus INTEGER NOT NULL
      )
      `,
            null,
            () => {
                tx.executeSql(`
        CREATE TABLE IF NOT EXISTS records (
          id INTEGER PRIMARY KEY,
          habitID INTEGER NOT NULL,
          description TEXT,
          entryTime INTEGER NOT NULL, 
          FOREIGN KEY(habitID)
              REFERENCES habits (id)
              ON DELETE CASCADE
        )
      `);
            }
        );
    })
}

export function execSql(sql, args) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(sql, args, (_, data) => resolve(data), (_, reason) => reject(reason))
        })
    });
}

export function createHabit(name, color) {
    return execSql(`
        INSERT INTO habits (name, color, filterStatus) 
            VALUES (? , ?, 1)
        `, [name, color]);
}

export function readHabits() {
    return execSql("SELECT * FROM habits", null)
        .then(res => res.rows._array);
}

export function deleteHabitAndCascade(id) {
    return execSql("DELETE FROM habits WHERE id = ?", [id]);
}

export function updateHabitColor(id, newColor) {
    return execSql(`
        UPDATE habits
        SET color = ?
        WHERE id = ? 
    `, [newColor, id]);
}

export function updateHabitName(id, newName) {
    return execSql(`
        UPDATE habits
        SET name = ?
        WHERE id = ? 
    `, [newName, id]);
}

export function updateHabitFilterStatus(id, newFilterStatus) {
    return execSql(`
        UPDATE habits
        SET filterStatus = ?
        WHERE id = ?
    `, [newFilterStatus, id]);
}
export function createRecord(habitID, description) {
    return execSql(`
        INSERT INTO records (habitID, description, entryTime)
            VALUES (? , ? , ?)
    `, [habitID, description, Math.floor(Date.now())]);
}

export function readRecords() {
    return execSql(`SELECT * from RECORDS ORDER BY entryTime DESC`)
        .then(res => {
            const rows = res.rows._array;
            rows.forEach(record => record.entryTime = new Date(record.entryTime));
            return rows;
        })
}

export function deleteRecord(id) {
    return execSql("DELETE FROM records WHERE id = ?", [id])
}