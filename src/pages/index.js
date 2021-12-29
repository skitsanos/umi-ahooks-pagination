/**
 * This example demonstrates how to use usePagination hook introduced in ahooks library.
 *
 * @author skitsanos
 * @version 1.0.0
 */
import {usePagination} from 'ahooks';
import {Avatar, Card, Col, Pagination, Row} from 'antd';
import Chance from 'chance';
import dayjs from 'dayjs';

const chance = new Chance('demo');

/**
 * Randomly generated user data
 * @returns {object}
 */
const randomPerson = () => ({
	name: chance.name(),
	email: chance.email(),
	gender: chance.gender(),
	birthday: chance.birthday()
});

const totalUsers = 35;
const allUsers = Array.from({length: totalUsers}, () => randomPerson());

const userList = (currentPage, pageSize) =>
{
	//this is where your data segment starts
	const startIndex = currentPage === 1 ? 0 : currentPage * pageSize - pageSize;
	//this is where data segment ends
	const endIndex = startIndex + pageSize;

	console.log('Browsing from', startIndex, 'to', endIndex);

	return {
		result: allUsers.slice(startIndex, endIndex),
		total: totalUsers
	};
};

const getUsers = ({current, pageSize}) => new Promise(resolve =>
{
	//Simulate 1s delay as if we were loading data from the server
	setTimeout(() => resolve(userList(current, pageSize)), 1000);
});

const page = () =>
{
	const {data, loading, pagination} = usePagination(getUsers);

	return <div>
		<Card title={'Users'}
			  loading={loading}>
			{data?.result.map((el, index) => <Card.Grid key={index}
														style={{width: '20%'}}>
				<Row>
					<Col>
						<Avatar size={48}
								src={`https://avatars.dicebear.com/api/croodles/${el.email}.svg`}/>
					</Col>

					<Col className={'user-details'}>
						<h3>{el.name}</h3>
						<div>{el.email}</div>
						<div>{el.gender}/{dayjs(el.birthday).format('YYYY-MM-DD')}</div>
					</Col>
				</Row>
			</Card.Grid>)}
		</Card>

		<Pagination
			current={pagination.current}
			pageSize={pagination.pageSize}
			total={data?.total}
			onChange={pagination.onChange}
			onShowSizeChange={pagination.onChange}
			showQuickJumper
			showSizeChanger
			style={{marginTop: 16, textAlign: 'right'}}
		/>
	</div>;
};

export default page;