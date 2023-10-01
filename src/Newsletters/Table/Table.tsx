import { DateTime } from "luxon";

import { NewsletterItem } from "../types";

import styles from "./Table.module.css";
import useClientSidePagination from "../../hooks/useClientSidePagination";

type TableProps = {
  data?: NewsletterItem[];
  removeItem: (id: string) => void;
};

export const Table = (props: TableProps) => {
  const { data, removeItem } = props;
  const [computedData, loadMore, isMore] = useClientSidePagination(data, 9);

  const onRemoveClick = (id: string) => () => removeItem(id);

  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.tableHead} data-cy="headers">
          <tr>
            <td width="185px">Name</td>
            <td width="180px">Creator</td>
            <td width="180px">Status</td>
            <td width="180px">Recipeints</td>
            <td width="140px">Date modified</td>
            <td width="80px">Remove</td>
          </tr>
        </thead>
        <tbody>
          {computedData?.map((item) => (
            <tr key={item.id}>
              <td>
                <strong>{item.name}</strong>
              </td>
              <td>{item.creator}</td>
              <td>{item.status}</td>
              <td className={!item.recipients ? styles.missing : ""}>
                {item.recipients || "Undefined"}
              </td>
              <td>{DateTime.fromISO(item.modifiedAt).toRelative()}</td>
              <td>
                <button
                  disabled={item.status !== "Draft"}
                  type="button"
                  className={styles.deleteButton}
                  onClick={onRemoveClick(item.id)}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isMore && (
        <div className={styles.loadMore}>
          <button
            className={styles.loadMoreButton}
            onClick={loadMore}
            type="button"
            data-cy="more"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};
