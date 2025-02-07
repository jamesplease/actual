// @ts-strict-ignore
import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  type UIEventHandler,
} from 'react';
import { type RefProp } from 'react-spring';

import { type CSSProperties } from '../../../../style';
import { Block } from '../../../common/Block';
import { View } from '../../../common/View';
import { type GroupedEntity } from '../../entities';

import { ReportTableList } from './ReportTableList';
import { ReportTableRow } from './ReportTableRow';

type ReportTableProps = {
  saveScrollWidth: (value: number) => void;
  listScrollRef: RefProp<HTMLDivElement>;
  handleScroll: UIEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  groupBy: string;
  balanceTypeOp: 'totalDebts' | 'totalTotals' | 'totalAssets';
  data: GroupedEntity[];
  mode: string;
  monthsCount: number;
};

export function ReportTable({
  saveScrollWidth,
  listScrollRef,
  handleScroll,
  style,
  groupBy,
  balanceTypeOp,
  data,
  mode,
  monthsCount,
}: ReportTableProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current && saveScrollWidth) {
      saveScrollWidth(contentRef.current ? contentRef.current.offsetWidth : 0);
    }
  });

  const renderItem = useCallback(
    ({ item, groupByItem, mode, style, key, monthsCount }) => {
      return (
        <ReportTableRow
          key={key}
          item={item}
          balanceTypeOp={balanceTypeOp}
          groupByItem={groupByItem}
          mode={mode}
          style={style}
          monthsCount={monthsCount}
        />
      );
    },
    [],
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        outline: 'none',
        '& .animated .animated-row': { transition: '.25s transform' },
        ...style,
      }}
      tabIndex={1}
    >
      <Block
        innerRef={listScrollRef}
        onScroll={handleScroll}
        id="list"
        style={{
          overflowY: 'auto',
          scrollbarWidth: 'none',
          '::-webkit-scrollbar': { display: 'none' },
          flex: 1,
          outline: 'none',
          '& .animated .animated-row': { transition: '.25s transform' },
          ...style,
        }}
      >
        <ReportTableList
          data={data}
          monthsCount={monthsCount}
          mode={mode}
          groupBy={groupBy}
          renderItem={renderItem}
        />
      </Block>
    </View>
  );
}
