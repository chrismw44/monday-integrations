import initMondayClient from "monday-sdk-js";
import { Logger } from "@mondaycom/apps-sdk";

const logTag = "Middleware";
const logger = new Logger(logTag);

export const getColumnValue = async (token, itemId, columnId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($itemId: [ID!], $columnId: [String!]) {
        items (ids: $itemId) {
          column_values(ids:$columnId) {
            ...on LinkValue {
              url
            }
            value
          }
        }
      }`;
    const variables = { columnId, itemId };

    const response = await mondayClient.api(query, { variables });
    console.log(response);
    console.log(response.data.items[0].column_values[0].url);
    return response.data.items[0].column_values[0].url;
  } catch (err) {
    logger.error(err);
  }
};

export const changeColumnValue = async (token, boardId, itemId, columnId, value) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `mutation change_column_value($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
    const variables = { boardId, columnId, itemId, value };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    logger.error(err);
  }
};
