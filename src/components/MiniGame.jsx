//import { wait } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";

export default function MiniGame({ onBack }) {
  //Grid mô tả kho đồ
  const [grid, setGrid] = useState(() => {
    const structure = [
      [true, true, false, false],
      [true, true, true, false],
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, true],
      [false, true, true, true],
    ];
    //Cấu trúc cho mỗi phần tử túi đồ
    return structure.map((row, rowIndex) =>
      row.map((valid, colIndex) => ({
        row: rowIndex,
        col: colIndex,
        valid,
        id: null,
        color: "lightgreen",
      }))
    );
  });

  const items = {
    shirt: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
      [2, 1],
    ],
    food: [
      [0, 0],
      [1, 0],
      [1, 1],
    ],
    hat: [[0, 0]],
  };

  //Chuyển từ offset sang 2D Array
  const offsetsToShape = (offsets) => {
    const maxRow = Math.max(...offsets.map(([r]) => r));
    const maxCol = Math.max(...offsets.map(([_, c]) => c));

    const shape = Array.from(
      { length: maxRow + 1 },
      () => Array.from({ length: maxCol + 1 }),
      () => false
    );
    offsets.forEach(([r, c]) => {
      shape[r][c] = true;
    });
    return shape;
  };

  //Danh sách các vật phẩm
  const itemsArray = [
    {
      id: "shirt",
      shape: offsetsToShape(items.shirt),
    },
    {
      id: "food",
      shape: offsetsToShape(items.food),
    },
    {
      id: "hat",
      shape: offsetsToShape(items.hat),
    },
  ];
  /*
  selectedItemId: lưu id vật phẩm được chọn
  selectedCell: lưu ô được chọn dựa trên col và row 
  */
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [tempBorderColor, setTempBorderColor] = useState("lime");

  //Lấy màu theo từng item
  const getColor = (itemId) => {
    if (itemId === "shirt") return "black";
    if (itemId === "food") return "yellow";
    if (itemId === "hat") return "orange";
  };

  // //Lấy ô đồ theo chỉ số cột, hàng
  // const getCell = (inCol, inRow) => {
  //   const numRow = grid.length;
  //   const numCol = grid[0].length;
  //   const isValidCell =
  //     0 <= inCol && inCol < numCol && 0 <= inRow && inRow < numRow;
  //   if (!isValidCell) {
  //     return false;
  //   }
  //   return grid.flat().find((cell) => cell.col === inCol && cell.row === inRow);
  // };

  //Xoay vật phẩm
  const rotate = (item) => {
    const rotated = item.map(([r, c]) => [c, -r]);

    const minRow = Math.min(...rotated.map(([r]) => r));
    const minCol = Math.min(...rotated.map(([_, c]) => c));
    return rotated.map(([r, c]) => [r - minRow, c - minCol]);
    // const tempShape = itemsArray.find(
    //   (item) => item.id === selectedItemId
    // )?.shape;
  };

  //Kiểm tra item có để vừa ko
  const canPlaceItem = (grid, shape, startCell) => {
    const shapeRows = shape.length;
    const shapeCols = shape[0].length;

    if (
      startCell?.row + shapeRows > grid.length ||
      startCell?.col + shapeCols > grid[0].length
    ) {
      return false;
    }
    return shape.every((row, r) =>
      row.every((cell, c) => {
        if (!cell) return true;
        const aCell = grid[startCell?.row + r][startCell?.col + c];
        return aCell.valid && aCell.id === null;
      })
    );
  };

  //Tô màu grid theo vật phẩm
  const colorGrid = (grid, shape, startCell, id, color) => {
    return shape.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (!cell) return;
        const aCell = grid[startCell?.row + r][startCell?.col + c];
        aCell.id = id;
        aCell.color = color;
      })
    );
  };

  //Đặt vật vào kho đồ
  const putItem = (startCell, id) => {
    if (!id || !startCell?.valid) return;
    const color = getColor(id);
    const tempShape = itemsArray.find((item) => item.id === id)?.shape;
    const checkValidArea = canPlaceItem(grid, tempShape, startCell);
    if (!checkValidArea) {
      setTempBorderColor("red");
      setTimeout(() => {
        setTempBorderColor("lime");
      }, 1000); // 1000ms = 1 giây
      return;
    }
    colorGrid(grid, tempShape, startCell, id, color);
  };

  //Hiển thị từng vật phẩm
  const displayItems = (item) => {
    const isSelected = selectedItemId === item.id;
    return (
      <div
        style={{
          display: "grid",
          gap: "2px",
          gridTemplateRows: `repeat(${item.shape.length}, 40px)`,
          gridTemplateColumns: `repeat(${item.shape[0].length}, 40px)`,
          cursor: "pointer",
          marginBottom: "10px",
        }}
        onClick={() => setSelectedItemId(item.id)}
      >
        {item.shape.flatMap((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: "40px",
                height: "40px",
                border: "1px solid white",
                backgroundColor: cell
                  ? isSelected
                    ? "silver"
                    : getColor(item.id)
                  : "white",
                opacity: cell ? 1 : 0.4,
              }}
            />
          ))
        )}
      </div>
    );
  };

  return (
    <>
      <h1>Minigame xếp hành trang</h1>
      <div className="admin-container">
        <div
          style={{
            display: "grid",
            gap: "2px",
            gridTemplateRows: `repeat(${grid.length}, 40px)`,
            gridTemplateColumns: `repeat(${grid[0].length}, 40px)`,
          }}
        >
          {grid.map((row) =>
            row.map((cell) => {
              const isSelected =
                selectedCell?.row === cell.row &&
                selectedCell?.col === cell.col;
              return (
                <div
                  key={`${cell.row}-${cell.col}`}
                  onClick={() => {
                    if (cell.valid) {
                      setSelectedCell({ row: cell.row, col: cell.col });
                      putItem(cell, selectedItemId);
                    }
                  }}
                  style={{
                    width: "40px",
                    height: "40px",
                    border: isSelected
                      ? `2px solid ${tempBorderColor}`
                      : "1px solid white",
                    backgroundColor: cell.valid
                      ? cell.id
                        ? cell.color // ô đã có vật phẩm
                        : "#ddd"
                      : "white",
                    opacity: cell.valid ? 1 : 0.4,
                    cursor: cell.valid ? "pointer" : "not-allowed",
                  }}
                />
              );
            })
          )}
        </div>
        <div className="item-panel">
          <h2 style={{ fontWeight: "bold" }}>Kho vật phẩm</h2>

          {itemsArray.map((item) => (
            <div key={item.id}>
              <p>
                {item.id === "shirt"
                  ? "👕 Quần áo"
                  : item.id === "food"
                  ? "🍞 Lương khô"
                  : "🧢 Mũ"}
              </p>
              {displayItems(item)}
            </div>
          ))}
        </div>

        <div className="grid-wrapper">{/* Phần lưới hiện tại của bạn */}</div>

        <button
          className="option-button"
          style={{ marginTop: "10px" }}
          onClick={onBack}
        >
          Quay lại
        </button>
      </div>
    </>
  );
}
