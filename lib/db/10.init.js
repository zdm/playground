import sql from "#core/sql";

export default sql`

-- extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- types
-- CREATE DOMAIN currency AS decimal(12, 4) NOT NULL DEFAULT 0

`;

// export const types = {
//     "currency": { "decode": Number },
// };
