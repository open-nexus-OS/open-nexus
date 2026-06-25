/**
 * Swizzled DocCard — replaces Docusaurus' default emoji card icons with
 * calm, colored line icons (HIG-style), driven by sidebar customProps:
 *   sidebar_custom_props: { icon: "cpu", color: "#0071e3" }   (on docs)
 *   "customProps": { "icon": "...", "color": "..." }          (in _category_.json)
 */
import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import type {Props} from '@theme/DocCard';
import {Icon} from '@site/src/components/Icon';
import styles from './styles.module.css';

function CardIcon({name, color}: {name?: string; color?: string}) {
  const accent = color ?? 'var(--ifm-color-primary)';
  return (
    <span
      className={styles.iconBadge}
      style={{color: accent, background: color ? `${color}1f` : 'var(--ifm-color-emphasis-100)'}}
      aria-hidden="true">
      <Icon name={name} />
    </span>
  );
}

function useCategoryItemsPlural() {
  const {selectMessage} = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        {count},
      ),
    );
}

function CardLayout({
  className,
  href,
  icon,
  color,
  title,
  description,
}: {
  className?: string;
  href: string;
  icon?: string;
  color?: string;
  title: string;
  description?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg', styles.cardContainer, className)}>
      <div className={styles.cardRow}>
        <CardIcon name={icon} color={color} />
        <div className={styles.cardBody}>
          <Heading as="h2" className={styles.cardTitle} title={title}>
            {title}
          </Heading>
          {description && (
            <p className={styles.cardDescription} title={description}>
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function CardCategory({item}: {item: Props['item'] & {type: 'category'}}): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();
  if (!href) {
    return null;
  }
  const cp = (item.customProps ?? {}) as {icon?: string; color?: string};
  return (
    <CardLayout
      className={item.className}
      href={href}
      icon={cp.icon}
      color={cp.color}
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}

function CardLink({item}: {item: Props['item'] & {type: 'link'}}): ReactNode {
  const doc = useDocById(item.docId ?? undefined);
  const cp = (item.customProps ?? {}) as {icon?: string; color?: string};
  return (
    <CardLayout
      className={item.className}
      href={item.href}
      icon={cp.icon}
      color={cp.color}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
