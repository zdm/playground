import sql from "#core/sql";

export default sql`

CREATE TABLE team (
    id int8 PRIMARY KEY DEFAULT create_acl( 'team' )
);

CREATE TRIGGER team_after_delete AFTER DELETE ON team FOR EACH ROW EXECUTE FUNCTION acl_after_delete_trigger();

`;
